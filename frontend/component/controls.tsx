import { useBearStore } from '../stores/store'

export default function Controls() {
  const increasePopulation = useBearStore((state:any) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}
