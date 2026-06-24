import { ContentBlock } from "../../lib/blog";
import LatexDocument from "./LatexDocument";
import MarkdownContent from "./MarkdownContent";

interface BlogPostContentProps {
  blocks: ContentBlock[];
}

export default function BlogPostContent({ blocks }: BlogPostContentProps) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "latex") {
          return (
            <LatexDocument
              key={index}
              html={block.html}
              sections={block.sections}
              title={block.title}
              embedded
            />
          );
        }

        return <MarkdownContent key={index} html={block.html!} />;
      })}
    </>
  );
}