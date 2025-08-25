import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const scoreboard = await prisma.match.findUnique({
      where: { id: params.id }
    })

    if (!scoreboard) {
      return NextResponse.json(
        { error: 'Scoreboard not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(scoreboard)
  } catch (error) {
    console.error('Error fetching scoreboard:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { homeScore, awayScore, isActive } = await request.json()

    const scoreboard = await prisma.match.update({
      where: { 
        id: params.id,
        userId: session.user.id
      },
      data: {
        ...(homeScore !== undefined && { homeScore }),
        ...(awayScore !== undefined && { awayScore }),
        ...(isActive !== undefined && { isActive })
      }
    })

    return NextResponse.json(scoreboard)
  } catch (error) {
    console.error('Error updating scoreboard:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.match.delete({
      where: { 
        id: params.id,
        userId: session.user.id
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting scoreboard:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}