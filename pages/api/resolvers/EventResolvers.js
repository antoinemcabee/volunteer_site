import mockPositions from '../mocks/mockPositions';
import mockEvents from '../mocks/mockEvents';
import mockOrgs from '../mocks/mockOrgs';

export const EventResolvers = {
  positions(parent, args, context) {
    let positions = [];
    for(const pos of mockPositions)
      if(pos.eventId == parent.eventId)
        positions.push(pos);
    return positions;
  }
}