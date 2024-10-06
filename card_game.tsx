"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Simplified card values for demonstration
const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const suits = ['♠', '♥', '♦', '♣']

interface Collectible {
  id: number
  name: string
  image: string
  card: string
}

export default function Component() {
  const [playerDeck, setPlayerDeck] = useState<Collectible[]>([])
  const [opponentDeck, setOpponentDeck] = useState<Collectible[]>([])
  const [playerCard, setPlayerCard] = useState<Collectible | null>(null)
  const [opponentCard, setOpponentCard] = useState<Collectible | null>(null)
  const [result, setResult] = useState<string>('')

  useEffect(() => {
    // Initialize decks
    const allCards = cardValues.flatMap(value => suits.map(suit => `${value}${suit}`))
    const shuffledCards = allCards.sort(() => Math.random() - 0.5)
    
    const initialPlayerDeck: Collectible[] = shuffledCards.slice(0, 26).map((card, index) => ({
      id: index,
      name: `Collectible ${index + 1}`,
      image: `/placeholder.svg?height=100&width=70&text=${card}`,
      card: card
    }))

    const initialOpponentDeck: Collectible[] = shuffledCards.slice(26).map((card, index) => ({
      id: index + 26,
      name: `Collectible ${index + 27}`,
      image: `/placeholder.svg?height=100&width=70&text=${card}`,
      card: card
    }))

    setPlayerDeck(initialPlayerDeck)
    setOpponentDeck(initialOpponentDeck)
  }, [])

  const playRound = () => {
    if (playerDeck.length === 0 || opponentDeck.length === 0) {
      setResult('Game Over!')
      return
    }

    const newPlayerCard = playerDeck[0]
    const newOpponentCard = opponentDeck[0]

    setPlayerCard(newPlayerCard)
    setOpponentCard(newOpponentCard)

    const playerCardValue = cardValues.indexOf(newPlayerCard.card[0])
    const opponentCardValue = cardValues.indexOf(newOpponentCard.card[0])

    if (playerCardValue > opponentCardValue) {
      setPlayerDeck([...playerDeck.slice(1), newPlayerCard, newOpponentCard])
      setOpponentDeck(opponentDeck.slice(1))
      setResult('You won this round!')
    } else if (playerCardValue < opponentCardValue) {
      setOpponentDeck([...opponentDeck.slice(1), newOpponentCard, newPlayerCard])
      setPlayerDeck(playerDeck.slice(1))
      setResult('You lost this round and the collectible!')
    } else {
      setPlayerDeck(playerDeck.slice(1))
      setOpponentDeck(opponentDeck.slice(1))
      setResult('Tie! Both collectibles are discarded.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-8">DRiP Collectible War</h1>
      <div className="flex flex-col items-center space-y-8">
        <div className="flex justify-between w-full max-w-2xl">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Your Deck</h2>
              <p>{playerDeck.length} collectibles</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Opponent's Deck</h2>
              <p>{opponentDeck.length} collectibles</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Your Card</h3>
            {playerCard && (
              <img src={playerCard.image} alt={playerCard.name} className="w-24 h-36 object-cover rounded" />
            )}
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Opponent's Card</h3>
            {opponentCard && (
              <img src={opponentCard.image} alt={opponentCard.name} className="w-24 h-36 object-cover rounded" />
            )}
          </div>
        </div>
        <Button onClick={playRound} disabled={playerDeck.length === 0 || opponentDeck.length === 0}>
          Play Round
        </Button>
        <div className="text-xl font-bold">{result}</div>
      </div>
    </div>
  )
}
