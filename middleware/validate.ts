import type { Request, Response, NextFunction } from 'express';

const STATUSES = ['applied', 'interview', 'offer', 'rejected'];

function isText(value: unknown): boolean {
  return typeof value === 'string' && value.trim() !== '';
}

function isDate(value: unknown): boolean {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function checkId(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(404).json({ error: `No application with id ${req.params.id}` });
  }
  next();
}

export function validateApplication(req: Request, res: Response, next: NextFunction) {
  const { company, role, status, applied_on, notes } = req.body ?? {};
  const problems: string[] = [];

  if (!isText(company)) problems.push('company is required and must be text');
  if (!isText(role)) problems.push('role is required and must be text');
  if (status !== undefined && !STATUSES.includes(status)) problems.push(`status must be one of: ${STATUSES.join(', ')}`);
  if (applied_on !== undefined && !isDate(applied_on)) problems.push('applied_on must be a date like 2026-11-24');
  if (notes !== undefined && notes !== null && typeof notes !== 'string') problems.push('notes must be text or null');

  if (problems.length > 0) {
    return res.status(400).json({ error: 'Invalid application', problems });
  }
  next();
}

export function validateApplicationPatch(req: Request, res: Response, next: NextFunction) {
  const body = req.body ?? {};
  const allowed = ['company', 'role', 'status', 'applied_on', 'notes'];
  const problems: string[] = [];

  const sent = Object.keys(body).filter((key) => allowed.includes(key));
  if (sent.length === 0) problems.push(`send at least one of: ${allowed.join(', ')}`);
  if ('company' in body && !isText(body.company)) problems.push('company must be text');
  if ('role' in body && !isText(body.role)) problems.push('role must be text');
  if ('status' in body && !STATUSES.includes(body.status)) problems.push(`status must be one of: ${STATUSES.join(', ')}`);
  if ('applied_on' in body && !isDate(body.applied_on)) problems.push('applied_on must be a date like 2026-11-24');
  if ('notes' in body && body.notes !== null && typeof body.notes !== 'string') problems.push('notes must be text or null');

  if (problems.length > 0) {
    return res.status(400).json({ error: 'Invalid update', problems });
  }
  next();
}