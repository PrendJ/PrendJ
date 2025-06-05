function individualPoints(position) {
  switch (position) {
    case 1: return 9;
    case 2: return 7;
    case 3: return 6;
    case 4: return 5;
    case 5: return 4;
    case 6: return 3;
    case 7: return 2;
    case 8: return 1;
    default: return 0;
  }
}

function relayPoints(position) {
  switch (position) {
    case 1: return 3;
    case 2: return 2;
    case 3: return 1;
    default: return 0;
  }
}

function calculatePlacementPoints(placement, relay=false) {
  let points = 0;
  const posPoints = relay ? relayPoints(placement.position) : individualPoints(placement.position);
  points += posPoints;

  if (placement.disqualified) points -= 2;
  if (placement.dns) points -= 4;
  if (placement.worldRecord) points += 15;
  if (placement.eventRecord) points += 5;
  return points;
}

module.exports = { individualPoints, relayPoints, calculatePlacementPoints };
