import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from './firebase'

export type Attendance = 'yes' | 'no'

export interface RsvpInput {
  name: string
  phone: string
  guests: number
  attending: Attendance
  message: string
}

export interface RsvpRecord extends RsvpInput {
  id: string
  createdAt: string | null
}

const COLLECTION = 'rsvps'

function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(message)), ms)),
  ])
}

export async function submitRsvp(input: RsvpInput): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured. Please add your Firebase environment variables.')
  }
  await withTimeout(
    addDoc(collection(db, COLLECTION), {
      ...input,
      createdAt: serverTimestamp(),
    }),
    15000,
    'Could not reach the database. Please check your connection and try again.',
  )
}

export async function getRsvps(): Promise<RsvpRecord[]> {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured. Please add your Firebase environment variables.')
  }
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => {
    const data = doc.data()
    const ts = data.createdAt as Timestamp | null
    return {
      id: doc.id,
      name: data.name ?? '',
      phone: data.phone ?? '',
      guests: data.guests ?? 1,
      attending: (data.attending ?? 'yes') as Attendance,
      message: data.message ?? '',
      createdAt: ts ? ts.toDate().toISOString() : null,
    }
  })
}
