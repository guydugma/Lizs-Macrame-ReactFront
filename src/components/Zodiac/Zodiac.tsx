import Icon from '@mdi/react';
import { mdiZodiacAquarius, mdiZodiacAries, mdiZodiacCancer, mdiZodiacCapricorn, mdiZodiacGemini, mdiZodiacLeo, mdiZodiacLibra, mdiZodiacPisces, mdiZodiacSagittarius, mdiZodiacScorpio, mdiZodiacTaurus, mdiZodiacVirgo } from '@mdi/js';

const zodiacsList = [{
  name: 'טלה', icon: mdiZodiacAries
},
{
  name: 'שור', icon: mdiZodiacTaurus
},
{
  name: 'תאומים', icon: mdiZodiacGemini
},
{
  name: 'סרטן', icon: mdiZodiacCancer
},
{
  name: 'אריה', icon: mdiZodiacLeo
},
{
  name: 'בתולה', icon: mdiZodiacVirgo
},
{
  name: 'מאזניים', icon: mdiZodiacLibra
},
{
  name: 'עקרב', icon: mdiZodiacScorpio
},
{
  name: 'קשת', icon: mdiZodiacSagittarius
},
{
  name: 'גדי', icon: mdiZodiacCapricorn
},
{
  name: 'דלי', icon: mdiZodiacAquarius
},
{
  name: 'דגים', icon: mdiZodiacPisces
}
]

type Props = {
  zodiac: string
}

const Zodiac = (props: Props) => {
  const zodiac = props.zodiac;
  return (
    <Icon path={zodiacsList.filter(z => z.name === zodiac)[0].icon} size={1} />)
}

export default Zodiac;

