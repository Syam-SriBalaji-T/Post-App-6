// src/app/api/posts/route.js
import fs from 'fs';
import path from 'path';

const titlesPath = path.join(process.cwd(), 'db', 'titles.json');
const datasPath = path.join(process.cwd(), 'db', 'datas.json');

export async function POST(request) {
  const body = await request.json();
  const { post_title, post_description, post_url } = body;

  if (!post_title || !post_description || !post_url) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  try {
    const titles = JSON.parse(fs.readFileSync(titlesPath, 'utf-8'));
    const datas = JSON.parse(fs.readFileSync(datasPath, 'utf-8'));

    if (titles.includes(post_title)) {
      return new Response(JSON.stringify({ error: 'Title already exists' }), { status: 400 });
    }

    titles.push(post_title);
    fs.writeFileSync(titlesPath, JSON.stringify(titles, null, 2), 'utf-8');

    datas.push({ post_title, post_description, post_url });
    fs.writeFileSync(datasPath, JSON.stringify(datas, null, 2), 'utf-8');

    return new Response(JSON.stringify({ message: 'Post created', title: post_title }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed to create post' }), { status: 500 });
  }
}
