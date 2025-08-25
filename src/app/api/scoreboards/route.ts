import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const scoreboards = await prisma.match.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(scoreboards)
  } catch (error) {
    console.error('Error fetching scoreboards:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { homeTeam, awayTeam, designType } = await request.json()

    if (!homeTeam || !awayTeam) {
      return NextResponse.json(
        { error: 'Team names are required' },
        { status: 400 }
      )
    }

    const scoreboard = await prisma.match.create({
      data: {
        name: `${homeTeam} vs ${awayTeam}`,
        homeTeam,
        awayTeam,
        designType: designType || 'MODERN',
        userId: session.user.id
      }
    })

    return NextResponse.json(scoreboard)
  } catch (error) {
    console.error('Error creating scoreboard:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}