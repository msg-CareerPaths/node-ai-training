import { Injectable, NotFoundException } from '@nestjs/common';
import { createReadStream, promises as fs } from 'fs';
import * as path from 'path';
import { WalkthroughFile } from '../types/walkthrough.types';

@Injectable()
export class WalkthroughService {
    private readonly walkthroughDir = path.resolve(
        process.cwd(),
        'static',
        'walkthrough'
    );

    async listFiles(): Promise<string[]> {
        let entries: { isFile(): boolean; name: string }[];
        try {
            entries = await fs.readdir(this.walkthroughDir, {
                withFileTypes: true
            });
        } catch {
            throw new NotFoundException('Walkthrough assets not found');
        }

        return entries
            .filter(entry => entry.isFile())
            .map(entry => entry.name)
            .sort();
    }

    async getFile(filename: string): Promise<WalkthroughFile> {
        const safeName = path.basename(filename);
        const candidatePath = path.resolve(this.walkthroughDir, safeName);

        if (!candidatePath.startsWith(this.walkthroughDir)) {
            throw new NotFoundException('File not found');
        }

        let stats: { isFile(): boolean };
        try {
            stats = await fs.stat(candidatePath);
        } catch {
            throw new NotFoundException('File not found');
        }

        if (!stats.isFile()) {
            throw new NotFoundException('File not found');
        }

        return {
            streamPath: candidatePath,
            filename: safeName,
            contentType: this.resolveContentType(safeName)
        };
    }

    createStream(file: WalkthroughFile) {
        return createReadStream(file.streamPath);
    }

    private resolveContentType(filename: string): string {
        const ext = path.extname(filename).toLowerCase();

        switch (ext) {
            case '.md':
                return 'text/markdown; charset=utf-8';
            case '.json':
                return 'application/json; charset=utf-8';
            case '.txt':
                return 'text/plain; charset=utf-8';
            case '.html':
                return 'text/html; charset=utf-8';
            default:
                return 'application/octet-stream';
        }
    }
}
