export type TaskStatus = 'idle' | 'pending' | 'processing' | 'completed' | 'failed'

export interface Task {
  id: string
  name: string
  status: TaskStatus
  progress: number
  error?: string
  result?: any
  createdAt: number
  updatedAt: number
}

export interface Job {
  id: string
  tasks: Task[]
  status: TaskStatus
  totalProgress: number
}

export class JobManager {
  private static instance: JobManager
  private jobs: Map<string, Job> = new Map()

  private constructor() {}

  static getInstance(): JobManager {
    if (!JobManager.instance) {
      JobManager.instance = new JobManager()
    }
    return JobManager.instance
  }

  createJob(taskNames: string[]): Job {
    const id = Math.random().toString(36).substring(7)
    const tasks: Task[] = taskNames.map(name => ({
      id: Math.random().toString(36).substring(7),
      name,
      status: 'idle',
      progress: 0,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }))

    const job: Job = {
      id,
      tasks,
      status: 'idle',
      totalProgress: 0
    }

    this.jobs.set(id, job)
    return job
  }

  updateTask(jobId: string, taskId: string, updates: Partial<Task>) {
    const job = this.jobs.get(jobId)
    if (!job) return

    const task = job.tasks.find(t => t.id === taskId)
    if (!task) return

    Object.assign(task, { ...updates, updatedAt: Date.now() })
    
    // Update job status and progress
    const completedTasks = job.tasks.filter(t => t.status === 'completed').length
    job.totalProgress = (job.tasks.reduce((acc, t) => acc + t.progress, 0) / job.tasks.length)
    
    if (job.tasks.some(t => t.status === 'failed')) {
      job.status = 'failed'
    } else if (completedTasks === job.tasks.length) {
      job.status = 'completed'
    } else if (job.tasks.some(t => t.status === 'processing')) {
      job.status = 'processing'
    }

    this.notifyListeners(jobId)
  }

  private listeners: Map<string, Array<(job: Job) => void>> = new Map()

  subscribe(jobId: string, callback: (job: Job) => void) {
    if (!this.listeners.has(jobId)) {
      this.listeners.set(jobId, [])
    }
    this.listeners.get(jobId)?.push(callback)
    
    const job = this.jobs.get(jobId)
    if (job) callback(job)

    return () => {
      const callbacks = this.listeners.get(jobId)
      if (callbacks) {
        this.listeners.set(jobId, callbacks.filter(c => c !== callback))
      }
    }
  }

  private notifyListeners(jobId: string) {
    const job = this.jobs.get(jobId)
    const callbacks = this.listeners.get(jobId)
    if (job && callbacks) {
      callbacks.forEach(c => c(job))
    }
  }
}
