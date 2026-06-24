import { ContentBlock } from "../../lib/blog";
import LatexDocument from "./LatexDocument";
import MarkdownContent from "./MarkdownContent";

export default function BlogPostContent({ blocks }: { blocks: ContentBlock[] }) {
  return blocks.map((block, index) =>
    block.type === "latex" ? (
      <LatexDocument key={index} embedded {...block} />
    ) : (
      <MarkdownContent key={index} html={block.html!} />
    )
  );
}