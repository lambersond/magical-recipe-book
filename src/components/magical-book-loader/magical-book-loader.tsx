import { MagicalBookLoaderProps } from './types'

export function MagicalBookLoader({
  loadingText = 'Brewing magical recipes...',
  className = '',
}: Readonly<MagicalBookLoaderProps>) {
  return (
    <div className={`magical-book-container ${className}`}>
      <div className='recipe-book'>
        {/* Book base structure */}
        <div className='book-base'></div>

        {/* Book pages background */}
        <div className='page-left-bg'></div>
        <div className='page-right-bg'></div>

        {/* Animated right page content */}
        <div className='right-page-content'>
          <div className='right-content-1'>
            <div className='squiggle-title'></div>
            <div className='squiggle-line'></div>
            <div className='squiggle-line short'></div>
            <div className='squiggle-line medium'></div>
            <div className='squiggle-line'></div>
            <div className='squiggle-line indent'></div>
            <div className='squiggle-line indent short'></div>
            <div className='image-placeholder'></div>
            <div className='squiggle-line'></div>
            <div className='squiggle-line medium'></div>
            <div className='magical-symbol'>✧ ◆ ✧</div>
          </div>

          <div className='right-content-2'>
            <div className='squiggle-title'></div>
            <div className='squiggle-line medium'></div>
            <div className='squiggle-line'></div>
            <div className='squiggle-line indent'></div>
            <div className='squiggle-line indent medium'></div>
            <div className='squiggle-line short'></div>
            <div className='image-placeholder'></div>
            <div className='squiggle-line'></div>
            <div className='squiggle-line indent short'></div>
            <div className='squiggle-line medium'></div>
            <div className='magical-symbol'>◊ ⬟ ◊</div>
          </div>

          <div className='right-content-3'>
            <div className='squiggle-title'></div>
            <div className='image-placeholder'></div>
            <div className='squiggle-line'></div>
            <div className='squiggle-line medium'></div>
            <div className='squiggle-line indent'></div>
            <div className='squiggle-line indent short'></div>
            <div className='squiggle-line'></div>
            <div className='squiggle-line short'></div>
            <div className='squiggle-line medium'></div>
            <div className='squiggle-line'></div>
            <div className='magical-symbol'>❋ ◈ ❋</div>
          </div>

          <div className='right-content-4'>
            <div className='squiggle-title'></div>
            <div className='squiggle-line'></div>
            <div className='squiggle-line short'></div>
            <div className='squiggle-line medium'></div>
            <div className='squiggle-line'></div>
            <div className='squiggle-line indent'></div>
            <div className='squiggle-line indent short'></div>
            <div className='image-placeholder'></div>
            <div className='squiggle-line'></div>
            <div className='squiggle-line medium'></div>
            <div className='magical-symbol'>✧ ◆ ✧</div>
          </div>
        </div>

        <div className='spine'></div>

        {/* Flipping pages with squiggle content */}
        <div className='page page-1'>
          <div className='squiggle-title'></div>
          <div className='squiggle-line'></div>
          <div className='squiggle-line medium'></div>
          <div className='squiggle-line short'></div>
          <div className='squiggle-line'></div>
          <div className='squiggle-line indent'></div>
          <div className='squiggle-line indent short'></div>
          <div className='squiggle-line indent'></div>
          <div className='image-placeholder'></div>
          <div className='squiggle-line'></div>
          <div className='squiggle-line medium'></div>
          <div className='magical-symbol'>⚡ ✨ ⚡</div>
        </div>

        <div className='page page-2'>
          <div className='squiggle-title'></div>
          <div className='image-placeholder'></div>
          <div className='squiggle-line'></div>
          <div className='squiggle-line short'></div>
          <div className='squiggle-line indent'></div>
          <div className='squiggle-line indent medium'></div>
          <div className='squiggle-line indent short'></div>
          <div className='squiggle-line'></div>
          <div className='squiggle-line medium'></div>
          <div className='squiggle-line short'></div>
          <div className='magical-symbol'>⟐ ◉ ⟐</div>
        </div>

        <div className='page page-3'>
          <div className='squiggle-title'></div>
          <div className='squiggle-line'></div>
          <div className='squiggle-line medium'></div>
          <div className='squiggle-line indent'></div>
          <div className='squiggle-line indent short'></div>
          <div className='squiggle-line indent'></div>
          <div className='squiggle-line indent medium'></div>
          <div className='image-placeholder'></div>
          <div className='squiggle-line'></div>
          <div className='squiggle-line short'></div>
          <div className='magical-symbol'>◯ ◉ ●</div>
        </div>

        <div className='page page-4'>
          <div className='squiggle-title'></div>
          <div className='squiggle-line'></div>
          <div className='squiggle-line medium'></div>
          <div className='squiggle-line short'></div>
          <div className='squiggle-line'></div>
          <div className='squiggle-line indent'></div>
          <div className='squiggle-line indent short'></div>
          <div className='squiggle-line indent'></div>
          <div className='image-placeholder'></div>
          <div className='squiggle-line'></div>
          <div className='squiggle-line medium'></div>
          <div className='magical-symbol'>⚡ ✨ ⚡</div>
        </div>

        {/* Magical sparkles */}
        <div className='sparkles'>
          <div className='sparkle'></div>
          <div className='sparkle'></div>
          <div className='sparkle'></div>
          <div className='sparkle'></div>
          <div className='sparkle'></div>
          <div className='sparkle'></div>
        </div>
      </div>

      <div className='loading-text'>{loadingText}</div>
    </div>
  )
}
