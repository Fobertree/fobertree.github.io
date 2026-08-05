const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function unquote(value: string) {
  return value.trim().replace(/^["']|["']$/g, "");
}

function parseYamlBlock(yaml: string): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  let currentKey: string | null = null;
  let listItems: string[] = [];
  let collectingList = false;

  const flushList = () => {
    if (currentKey !== null && collectingList) {
      data[currentKey] = listItems;
      listItems = [];
      currentKey = null;
      collectingList = false;
    }
  };

  for (const rawLine of yaml.split("\n")) {
    const line = rawLine.replace(/\r$/, "");
    if (!line.trim() || line.trim().startsWith("#")) continue;

    // YAML lists may be indented or flush-left under a key:
    //   tags:
    //     - a
    //   tags:
    //   - a
    const listMatch = line.match(/^\s*-\s+(.+)$/);
    if (listMatch && collectingList && currentKey) {
      listItems.push(unquote(listMatch[1]));
      continue;
    }

    flushList();

    const kvMatch = line.match(/^([\w-]+):\s*(.*)$/);
    if (!kvMatch) continue;

    const [, key, value] = kvMatch;
    if (value === "") {
      currentKey = key;
      listItems = [];
      collectingList = true;
      continue;
    }

    data[key] = unquote(value);
    currentKey = null;
    collectingList = false;
  }

  flushList();
  return data;
}

export function parseFrontmatter(raw: string) {
  const match = raw.match(FRONTMATTER_REGEX);
  if (!match) return { data: {}, content: raw };

  return {
    data: parseYamlBlock(match[1]),
    content: match[2],
  };
}
