export function IngredientsPouchSearchFilter() {
  return (
    <div className='bg-gray-800 rounded-lg border border-gray-700 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-2'>
            <label className='text-sm font-medium text-gray-300'>
              Filter by Rarity:
            </label>
            <select className='bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'>
              <option value=''>All Rarities</option>
              <option value='common'>Common</option>
              <option value='uncommon'>Uncommon</option>
              <option value='rare'>Rare</option>
              <option value='legendary'>Legendary</option>
            </select>
          </div>
          <div className='flex items-center space-x-2'>
            <label className='text-sm font-medium text-gray-300'>Status:</label>
            <select className='bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'>
              <option value=''>All Status</option>
              <option value='fresh'>Fresh</option>
              <option value='expired'>Expired</option>
            </select>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <label className='text-sm font-medium text-gray-300'>Sort by:</label>
          <select className='bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'>
            <option value='name'>Name</option>
            <option value='rarity'>Rarity</option>
            <option value='foundDate'>Found Date</option>
            <option value='expiration'>Expiration</option>
          </select>
        </div>
      </div>
    </div>
  )
}
