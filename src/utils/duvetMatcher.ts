import type { Duvet, TemperaturePreference } from '../types/duvet';

interface StepData {
  [stepId: string]: unknown;
}

interface PriorityWeights {
  comfort: number;
  temperature: number;
  maintenance: number;
  materials: number;
  price: number;
  quality: number;
}

// Beregn match score baseret på brugerens svar og prioriteter
export function calculateDuvetMatches(duvets: Duvet[], stepData: StepData): Duvet[] {
  // Udtræk brugerens svar
  const userMood = stepData['stemning'] as string | undefined;
  const userTemperature = stepData['temperatur'] as TemperaturePreference | undefined;
  const userWeightPreference = (stepData['vægt-fylde'] as number) || 50;
  const userSeason = stepData['sæson'] as string | undefined;
  const userBudgetLevel = (stepData['budget-price'] as number) || 50;
  const userPriorities = (stepData['budget-priorities'] as Record<string, number>) || {};

  // Normaliser prioriteter (hvis ingen point er fordelt, giv alle samme vægt)
  const totalPoints = Object.values(userPriorities).reduce((sum, val) => sum + val, 0);
  const priorities: PriorityWeights = {
    comfort: totalPoints > 0 ? (userPriorities['comfort'] || 0) : 1.67,
    temperature: totalPoints > 0 ? (userPriorities['temperature'] || 0) : 1.67,
    maintenance: totalPoints > 0 ? (userPriorities['maintenance'] || 0) : 1.67,
    materials: totalPoints > 0 ? (userPriorities['materials'] || 0) : 1.67,
    price: totalPoints > 0 ? (userPriorities['price'] || 0) : 1.67,
    quality: totalPoints > 0 ? (userPriorities['quality'] || 0) : 1.67,
  };

  // Beregn score for hver dyne
  const scoredDuvets = duvets.map(duvet => {
    let totalScore = 0;

    // 1. COMFORT SCORE - Match mellem brugerens stemning og dyne mood
    if (userMood && priorities.comfort > 0) {
      const moodMatch = duvet.mood.includes(userMood);
      const comfortScore = moodMatch ? 100 : 30; // 100 point for match, 30 for no match
      totalScore += comfortScore * priorities.comfort;
    }

    // 2. TEMPERATURE SCORE - Match mellem brugerens temperatur præference og dyne
    if (userTemperature && priorities.temperature > 0) {
      const tempMatch = duvet.temperature.includes(userTemperature);
      const temperatureScore = tempMatch ? 100 : 30;
      totalScore += temperatureScore * priorities.temperature;
    }

    // 3. MAINTENANCE SCORE - Baseret på filling type og vedligeholdelsesegenskaber
    if (priorities.maintenance > 0) {
      // Dun er nemmere at vedligeholde end blanding
      const maintenanceScore = duvet.characteristics.filling === 'dun' ? 100 : 70;
      totalScore += maintenanceScore * priorities.maintenance;
    }

    // 4. MATERIALS SCORE - Baseret på fill power og thread count
    if (priorities.materials > 0) {
      // Normaliser fill power (700-850 range) og thread count (260-320 range)
      const fillPowerScore = ((duvet.characteristics.fillPower - 700) / 150) * 50 + 50; // 50-100
      const threadCountScore = ((duvet.characteristics.threadCount - 260) / 60) * 50 + 50; // 50-100
      const materialsScore = (fillPowerScore + threadCountScore) / 2;
      totalScore += materialsScore * priorities.materials;
    }

    // 5. PRICE SCORE - Inversed distance mellem budget niveau og pris niveau
    if (priorities.price > 0) {
      // Konverter budget slider (0-100) til prisniveau (1-3)
      const userPriceLevel = 1 + (userBudgetLevel / 100) * 2; // 1-3
      const priceDifference = Math.abs(userPriceLevel - duvet.priceLevel);
      const priceScore = 100 - (priceDifference / 2) * 50; // Max afvigelse er 2, giv 0-100 score
      totalScore += Math.max(0, priceScore) * priorities.price;
    }

    // 6. QUALITY SCORE - Baseret på fill power, certifications (alle har samme)
    if (priorities.quality > 0) {
      const qualityScore = ((duvet.characteristics.fillPower - 700) / 150) * 100; // 0-100 baseret på fill power
      totalScore += qualityScore * priorities.quality;
    }

    // BONUS SCORES (ikke vægtet af prioriteter, men vigtige faktorer)

    // Season match bonus
    if (userSeason) {
      const seasonMatch = duvet.seasons.includes(userSeason as 'summer' | 'all-year' | 'winter' | '4-season');
      if (seasonMatch) {
        totalScore += 50; // Bonus for season match
      }
    }

    // Weight preference match
    const weightDifference = Math.abs(userWeightPreference - duvet.weightPreference);
    const weightScore = 100 - (weightDifference / 100) * 100; // 0-100 baseret på afvigelse
    totalScore += Math.max(0, weightScore) * 0.5; // Vægt med 0.5 faktor

    return {
      ...duvet,
      matchingScore: Math.round(totalScore)
    };
  });

  // Sorter efter score (højeste først)
  return scoredDuvets.sort((a, b) => b.matchingScore - a.matchingScore);
}

