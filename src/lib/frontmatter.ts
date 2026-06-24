const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function unquote(value: string) {
  return value.trim().replace(/^["']|["']$/g, "");
}

function parseYamlBlock(yaml: string): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  let currentKey: string | null = null;
  let listItems: string[] = [];

  const flushList = () => {
    if (currentKey && listItems.length) {
      data[currentKey] = listItems;
      listItems = [];
      currentKey = null;
    }
  };

  for (const line of yaml.split("\n")) {
    const listMatch = line.match(/^\s+-\s+(.+)$/);
    if (listMatch && currentKey) {
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
      continue;
    }

    data[key] = unquote(value);
    currentKey = null;
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