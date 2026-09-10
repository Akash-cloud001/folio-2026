export type PetId =
    | 'beaver'
    | 'bee'
    | 'bunny'
    | 'cat'
    | 'caterpillar'
    | 'chick'
    | 'cow'
    | 'crab'
    | 'deer'
    | 'dog'
    | 'elephant'
    | 'fish'
    | 'fox'
    | 'giraffe'
    | 'hog'
    | 'koala'
    | 'lion'
    | 'monkey'
    | 'panda'
    | 'parrot'
    | 'penguin'
    | 'pig'
    | 'polar'
    | 'tiger';

export type PetDef = {
    id: PetId;
    label: string;
    preview: string;
    model: string;
};

const PET_BASE = '/pets';
const PET_GLB = `${PET_BASE}/Models/GLB%20format`;
const PET_PREVIEWS = `${PET_BASE}/Previews`;

const PET_IDS: PetId[] = [
    'beaver',
    'bee',
    'bunny',
    'cat',
    'caterpillar',
    'chick',
    'cow',
    'crab',
    'deer',
    'dog',
    'elephant',
    'fish',
    'fox',
    'giraffe',
    'hog',
    'koala',
    'lion',
    'monkey',
    'panda',
    'parrot',
    'penguin',
    'pig',
    'polar',
    'tiger',
];

function labelFromId(id: PetId): string {
    return id.charAt(0).toUpperCase() + id.slice(1);
}

export const CITY_PETS: PetDef[] = PET_IDS.map((id) => ({
    id,
    label: labelFromId(id),
    preview: `${PET_PREVIEWS}/animal-${id}.png`,
    model: `${PET_GLB}/animal-${id}.glb`,
}));

export const CITY_PET_BY_ID: Record<PetId, PetDef> = CITY_PETS.reduce(
    (acc, pet) => {
        acc[pet.id] = pet;
        return acc;
    },
    {} as Record<PetId, PetDef>,
);

export const DEFAULT_PET_ID: PetId = 'dog';

/** Visual scale so cube pets roughly match capsule height */
export const PET_MODEL_SCALE = 0.42;
