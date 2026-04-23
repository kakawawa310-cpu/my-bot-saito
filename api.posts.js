import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // 投稿をすべて取得して表示
        const posts = await kv.lrange('posts', 0, -1);
        return res.status(200).json(posts);
    } else if (req.method === 'POST') {
        // 新しい投稿を保存
        const { username, text } = req.body;
        await kv.lpush('posts', JSON.stringify({ username, text, date: new Date() }));
        return res.status(200).json({ message: "投稿完了" });
    }
}
