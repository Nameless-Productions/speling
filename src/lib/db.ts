import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from './generated/prisma/client';
import { DATABASE_URL } from '$env/static/private';

const adapter = new PrismaLibSql({
	url: DATABASE_URL
});

export const db = new PrismaClient({ adapter });