import armor_img from '../img/armor.png'
import sword_img from '../img/sword.png'
import feather_img from '../img/feather.png'
import coin_img from '../img/coin.png'
import { useState } from 'react'

export default function Inventory() {

    const { armorPrice, setArmorPrice } = useState(10)

    return (
        <div className="container flex flex-col">
            <p className="flex flex-col items-center font-semibold text-3xl text-slate-50 mb-8">Inventory</p>
            
            <p className="text-slate-50">Main slots</p>
            <div className="flex">
                <div className="mt-4 mr-2 w-20 h-24 bg-slate-800 hover:bg-slate-700/30">
                    <img src={armor_img} alt='Armor'></img>
                </div>
                <div className="mt-4 mr-2 w-20 h-24 bg-slate-800"></div>
                <div className="mt-4 mr-2 w-20 h-24 bg-slate-800"></div>
                <div className="mt-4 mr-2 w-20 h-24 bg-slate-800"></div>
            </div>
        </div>
    )
}