export const dynamic = "force-static";
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { tasks, activityLog } from '@/lib/schema';
import { desc, eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const db = getDb();
    const allTasks = db.select().from(tasks).orderBy(desc(tasks.created_at)).all();
    return NextResponse.json(allTasks);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    const now = new Date().toISOString();

    const newTask = {
      id: uuidv4(),
      title: body.title,
      description: body.description || '',
      status: body.status || 'pending',
      priority: body.priority || 'medium',
      owner_type: body.owner_type || '',
      owner_id: body.owner_id || '',
      lead_id: body.lead_id || '',
      deadline: body.deadline || '',
      created_at: now,
    };

    db.insert(tasks).values(newTask).run();

    // Log activity
    db.insert(activityLog).values({
      id: uuidv4(),
      entity_type: 'task',
      entity_id: newTask.id,
      action: 'created',
      details: `New task: ${newTask.title}`,
      user_id: '',
      created_at: now,
    }).run();

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Failed to create task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Task ID required' }, { status: 400 });
    }

    const db = getDb();
    const now = new Date().toISOString();

    db.update(tasks)
      .set(updates)
      .where(eq(tasks.id, id))
      .run();

    const updated = db.select().from(tasks).where(eq(tasks.id, id)).get();
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update task:', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Task ID required' }, { status: 400 });
    }

    const db = getDb();
    const now = new Date().toISOString();

    db.delete(tasks).where(eq(tasks.id, id)).run();

    // Log activity
    db.insert(activityLog).values({
      id: uuidv4(),
      entity_type: 'task',
      entity_id: id,
      action: 'deleted',
      details: `Task deleted: ${id}`,
      user_id: '',
      created_at: now,
    }).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete task:', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
