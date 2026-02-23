import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

const TOKEN = process.env.GH_TOKEN!;
const OWNER = '5150-Surfstung';
const REPO = 'tides-stay-hub';

const octokit = new Octokit({ auth: TOKEN });

const SKIP_DIRS = ['.git', 'node_modules', 'dist', '.local', '.cache', '.config', '.upm', 'attached_assets'];
const SKIP_FILES = ['.replit', '.gitconfig'];

function getAllFiles(dir: string, baseDir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(baseDir, fullPath);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.includes(entry.name)) {
        files.push(...getAllFiles(fullPath, baseDir));
      }
    } else {
      if (!SKIP_FILES.includes(entry.name)) {
        files.push(relPath);
      }
    }
  }
  return files;
}

async function main() {
  const baseDir = process.cwd();
  const files = getAllFiles(baseDir, baseDir);
  console.log(`Found ${files.length} files to upload`);

  const tree: any[] = [];
  for (const filePath of files) {
    const fullPath = path.join(baseDir, filePath);
    const content = fs.readFileSync(fullPath);
    const isBinary = filePath.match(/\.(png|jpg|jpeg|webp|ico|woff|woff2|ttf|eot)$/i);

    if (isBinary) {
      const { data: blob } = await octokit.git.createBlob({
        owner: OWNER,
        repo: REPO,
        content: content.toString('base64'),
        encoding: 'base64',
      });
      tree.push({ path: filePath, mode: '100644', type: 'blob', sha: blob.sha });
      console.log(`  [binary] ${filePath}`);
    } else {
      const { data: blob } = await octokit.git.createBlob({
        owner: OWNER,
        repo: REPO,
        content: content.toString('utf-8'),
        encoding: 'utf-8',
      });
      tree.push({ path: filePath, mode: '100644', type: 'blob', sha: blob.sha });
      console.log(`  [text]   ${filePath}`);
    }
  }

  console.log('\nCreating tree...');
  const { data: newTree } = await octokit.git.createTree({
    owner: OWNER,
    repo: REPO,
    tree,
  });

  console.log('Creating commit...');
  const { data: commit } = await octokit.git.createCommit({
    owner: OWNER,
    repo: REPO,
    message: 'Tides Folly Beach Stay Hub - full project',
    tree: newTree.sha,
    parents: [],
  });

  console.log('Setting main branch...');
  try {
    await octokit.git.createRef({
      owner: OWNER,
      repo: REPO,
      ref: 'refs/heads/main',
      sha: commit.sha,
    });
  } catch {
    await octokit.git.updateRef({
      owner: OWNER,
      repo: REPO,
      ref: 'heads/main',
      sha: commit.sha,
      force: true,
    });
  }

  console.log(`\nDone! Your code is live at: https://github.com/${OWNER}/${REPO}`);
}

main().catch(e => { console.error('Error:', e.message); process.exit(1); });
