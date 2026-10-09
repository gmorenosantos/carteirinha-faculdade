import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
const root = new URL('./dist/', import.meta.url);
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.jpeg':'image/jpeg','.png':'image/png','.webmanifest':'application/manifest+json'};
http.createServer(async(req,res)=>{try{const p=req.url==='/'?'index.html':req.url.slice(1);const file=new URL(p,root);const body=await readFile(file);res.writeHead(200,{'content-type':types[extname(p)]||'application/octet-stream'});res.end(body)}catch{res.writeHead(404);res.end('Not found')}}).listen(4173,'127.0.0.1');
