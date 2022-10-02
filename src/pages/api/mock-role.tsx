import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export const getMockRole = async () => {
  const jsonDirectory = path.join(process.cwd());
  const fileContents = await fs.readFile(
    jsonDirectory + '/mock-role.txt',
    'utf8'
  );
  return fileContents;
};

export const setMockRole = async (role) => {
  const jsonDirectory = path.join(process.cwd());
  await fs.writeFile(jsonDirectory + '/mock-role.txt', role, 'utf8');
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const mockRole = await getMockRole();
    res.status(200).json({ role: mockRole });
  } else {
    setMockRole(req.body.role);
    res.status(200).json(null);
  }
};

export default handler;
