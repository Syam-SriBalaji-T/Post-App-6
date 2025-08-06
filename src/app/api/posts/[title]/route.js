import fs from 'fs';
import path from 'path';

export async function GET(req, { params }) {
  const title = params.title;
  const titlesPath = path.join(process.cwd(), 'db', 'titles.json');
  const datasPath = path.join(process.cwd(), 'db', 'datas.json');

  try {
    const titles = JSON.parse(fs.readFileSync(titlesPath, 'utf-8'));
    const datas = JSON.parse(fs.readFileSync(datasPath, 'utf-8'));

    if (titles.includes(title)) {
      const post = datas.find(d => d.post_title === title);
      if (post) {
        return new Response(JSON.stringify(post), { status: 200 });
      }
    }

    return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}