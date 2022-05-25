import ReactMarkdown from "react-markdown";
import PostHeader from "./PostHeader";
import styles from './PostContent.module.css';

const MOCK_POST = {
    date: '05-11-2022',
    title: 'Some Title',
    slug: 'slug1',
    image: 'post1.jpg',
    content: `This is my *first* blog post! It is being written in **Markdown**!

    > A block quote with ~strikethrough~ and a URL: https://reactjs.org.

    * Here is a random **bulletpoint**
    * And another
    * Here's a final bullet point!
    
    Here is a table:
    | Item         | Price     | # In stock |
    |--------------|-----------|------------|
    | Juicy Apples | 1.99      | *7*        |
    | Bananas      | **1.89**  | 5234       |
    `,
};

function PostContent() {
    return (
        <article className={styles.content}>
            <PostHeader title={MOCK_POST.title} image={`/images/posts/${MOCK_POST.slug}/${MOCK_POST.image}`} />
            <ReactMarkdown>{MOCK_POST.content}</ReactMarkdown>
        </article>
    )
}

export default PostContent;