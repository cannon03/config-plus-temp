import KeyCardImage from '$lib/assets/key-card.svg';

export const KEY_CARD_TYPES = {
    '1key': {
        key: '1key',
        type: 'standard',
        label: '1-Key Key Card',
        num_keys: 1,
        layout: [{ key_id: 1, row: 2, col: 2 }],
        rows: 3,
        cols: 3,
        image: KeyCardImage
    }
} as const;
