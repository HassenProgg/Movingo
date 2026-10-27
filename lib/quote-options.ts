export const furnitureServices = {
  none: 'Aucun',
  assembly: 'Montage uniquement',
  disassembly: 'Démontage uniquement',
  both: 'Montage et démontage',
};

export const roomOptions = ['S+0', 'S+1', 'S+2', 'S+3', 'S+4', 'S+5', 'S+6', 'S+7', 'S+8', 'S+9', 'S+10', 'other', 'not-applicable'];

export function roomLabel(value: string) {
  return value === 'other' ? 'Autre (voir détails)' : value === 'not-applicable' ? 'Non concerné' : value;
}
