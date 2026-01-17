import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeMinifyWhitespace from 'rehype-minify-whitespace';
import rehypeStringify from 'rehype-stringify';

const parseMarkdownToReact = (markdown) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .use(rehypeMinifyWhitespace, { newlines: false, tabs: false, spaces: false });

  const content = processor.processSync(markdown).toString();
  return content;
}

export { parseMarkdownToReact };
