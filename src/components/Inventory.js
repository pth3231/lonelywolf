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
            <div className="flex justify-center p-4">
                <div className="mx-4 flex flex-col bg-slate-800 ring-1 ring-slate-700 shadow-xl hover:shadow-none hover:transition hover:duration-300 shadow-slate-600/60 w-24 rounded-lg items-center">
                    <img src={armor_img} className="mb-4 w-16" alt="Armor" />
                    <div className='flex justify-center'>
                        <span className="text-slate-50 pr-1"> {10} </span>
                        <img className="w-5" src={coin_img} />
                    </div>
                </div>
                <div className="mx-4 flex flex-col bg-slate-800 ring-1 ring-slate-700 shadow-xl hover:shadow-none hover:transition hover:duration-300 shadow-slate-600/60 w-24 rounded-lg items-center">
                    <img src={sword_img} className="mb-4 w-16" alt="Armor" />
                    <div className='flex justify-center'>
                        <span className="text-slate-50 pr-1"> {10} </span>
                        <img className="w-5" src={coin_img} />
                    </div>
                </div>
                <div className="mx-4 flex flex-col bg-slate-800 ring-1 ring-slate-700 shadow-xl hover:shadow-none hover:transition hover:duration-300 shadow-slate-600/60 w-24 rounded-lg items-center">
                    <img src={feather_img} className="mb-4 w-16" alt="Armor" />
                    <div className='flex justify-center'>
                        <span className="text-slate-50 pr-1"> {10} </span>
                        <img className="w-5" src={coin_img} />
                    </div>
                </div>
                <div className="mx-4 flex flex-col bg-slate-800 ring-1 ring-slate-700 shadow-xl hover:shadow-none hover:transition hover:duration-300 shadow-slate-600/60 w-24 rounded-lg items-center">
                    <img src={armor_img} className="mb-4 w-16" alt="Armor" />
                    <div className='flex justify-center'>
                        <span className="text-slate-50 pr-1"> {10} </span>
                        <img className="w-5" src={coin_img} />
                    </div>
                </div>
            </div>
        </div>
    )
}