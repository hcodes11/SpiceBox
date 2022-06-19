import Carousel from 'react-bootstrap/Carousel';
import appetizer from '../Images/appetizer.jpg';
import recipe from '../Images/recipe.jpg';
import shrimp from '../Images/shrimp.jpg';
<Carousel>
<Carousel.Item>
<img className='d-block w-100' src={appetizer} alt='appetizer' />
</Carousel.Item>
<Carousel.Item>
<img className='d-block w-100' src={shrimp} alt='shrimp' />
</Carousel.Item>
<Carousel.Item>
<img className='d-block w-100' src={recipe} alt='recipe' />
</Carousel.Item>
</Carousel>