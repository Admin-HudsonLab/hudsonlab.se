import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

export default function Section({ title, slug, content }) {


  

  const onlyTheFirstContent = content[0].fields.content; 

  return (
    <section id={slug}>
      <h3>{title}</h3>
      <ReactMarkdown plugins={[gfm]} children={onlyTheFirstContent} className="prose"/>
    </section>
  );
}
