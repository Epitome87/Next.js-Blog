import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import PostHeader from "./PostHeader";
import styles from './PostContent.module.css';

function PostContent({post}) {
    const customComponents = {
        image(image) {
            return <Image src={`/images/posts/${post.slug}/${image.src}`} alt={image.alt} width={600} height={300} />
        },
        code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={atomDark}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        p(paragraph) {
            const { node } = paragraph;

            if (node.children[0].tagName === 'img') {
                const image = node.children[0];

                const metastring = image.properties.alt
                const alt = metastring?.replace(/ *\{[^)]*\} */g, "")
                const metaWidth = metastring.match(/{([^}]+)x/)
                const metaHeight = metastring.match(/x([^}]+)}/)
                const width = metaWidth ? metaWidth[1] : "768"
                const height = metaHeight ? metaHeight[1] : "432"

                return (
                <div className={styles.image}>
                    <Image src={`/images/posts/${post.slug}/${image.properties.src}`} alt={image.properties.alt} width={width} height={height} />
                </div>
                );
            }

            return <p>{paragraph.children}</p>
        }
    }
    return (
        <article className={styles.content}>
            <PostHeader title={post.title} image={`/images/posts/${post.slug}/${post.image}`} />
            <ReactMarkdown 
            children={post.content}
            components={customComponents}
            remarkPlugins={[remarkGfm]} />
        </article>
    )
}

export default PostContent;