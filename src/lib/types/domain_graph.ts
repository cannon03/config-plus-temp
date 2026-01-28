import type { Unit } from './unit';
import type { ZoneResponse } from './zone';
import type { RCUResponse } from './rcu';

export interface UnitDomainGraphResponse {
	unit: Unit;
	layout: {
		zones: ZoneResponse[];
	};
	hardware: {
		rcus: RCUResponse[];
	};
}
