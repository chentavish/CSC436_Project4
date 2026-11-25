import { Router } from 'express';
import * as applications from '../services/applications.ts';
import type { NewApplication, ApplicationChanges } from '../services/applications.ts';
import { checkId, validateApplication, validateApplicationPatch } from '../middleware/validate.ts';

const router = Router();

const notFoundMsg = (id: unknown) => ({ error: `No application with id ${String(id)}` });

function text(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

router.get('/', async (req, res) => {
  const list = await applications.listApplications({
    status: text(req.query.status),
    company: text(req.query.company),
  });
  res.json(list);
});

router.get('/:id', checkId, async (req, res) => {
  const application = await applications.getApplication(Number(req.params.id));
  if (!application) return res.status(404).json(notFoundMsg(req.params.id));
  res.json(application);
});

router.post('/', validateApplication, async (req, res) => {
  const { company, role, status, applied_on, notes = null } = req.body;
  const newApplication: NewApplication = {
    company: company.trim(),
    role: role.trim(),
    status,
    applied_on,
    notes,
  };
  const saved = await applications.createApplication(newApplication);
  res.status(201).json(saved);
});

router.patch('/:id', checkId, validateApplicationPatch, async (req, res) => {
  const { company, role, status, applied_on, notes } = req.body;
  const changes: ApplicationChanges = {};
  if (company !== undefined) changes.company = company.trim();
  if (role !== undefined) changes.role = role.trim();
  if (status !== undefined) changes.status = status;
  if (applied_on !== undefined) changes.applied_on = applied_on;
  if (notes !== undefined) changes.notes = notes;

  const updated = await applications.updateApplication(Number(req.params.id), changes);
  if (!updated) return res.status(404).json(notFoundMsg(req.params.id));
  res.json(updated);
});

router.delete('/:id', checkId, async (req, res) => {
  const deleted = await applications.deleteApplication(Number(req.params.id));
  if (!deleted) return res.status(404).json(notFoundMsg(req.params.id));
  res.status(204).end();
});

export default router;