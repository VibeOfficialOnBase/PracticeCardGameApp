/* Lightweight TypeScript hook to load practice cards JSON and provide utility functions.
   This will be expanded later to include Supabase persistence (user history, favorites).
*/
import { useMemo } from "react";
import practiceCards from "../data/practiceCards.json";

export type PracticeCard = {
  id: string;
  title: string;
  mission: string;
  affirmation: string;
  leche_value: "Love" | "Empathy" | "Compassion" | "Humility" | "Enthusiasm" | string;
  share_text?: string;
};

export function usePracticeCards(){
  const cards = useMemo(()=> (practiceCards as PracticeCard[] || []), []);

  function getRandomCard(): PracticeCard | null {
    if (!cards.length) return null;
    const idx = Math.floor(Math.random() * cards.length);
    return cards[idx];
  }

  function getCardById(id: string): PracticeCard | undefined {
    return cards.find(c => c.id === id);
  }

  function getDailyCard(date = new Date()): PracticeCard | null {
    // deterministic daily card derived from date
    if (!cards.length) return null;
    const day = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
    const idx = day % cards.length;
    return cards[idx];
  }

  return { cards, getRandomCard, getCardById, getDailyCard };
}