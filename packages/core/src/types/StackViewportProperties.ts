import InterpolationType from '../enums/InterpolationType';
import VOILUTFunctionType from '../enums/VOILUTFunctionType';
import { VOIRange } from './voi';

/**
 * Stack Viewport Properties
 */
type StackViewportProperties = {
  /** voi range (upper, lower) for the viewport */
  voiRange?: VOIRange;
  /** voiLutFunction type which is LINEAR, EXACT_LINEAR, or SIGMOID */
  voiLutFunction?: VOILUTFunctionType;
  /** invert flag - whether the image is inverted */
  invert?: boolean;
  /** interpolation type - linear or nearest neighbor */
  interpolationType?: InterpolationType;
  /** image rotation */
  rotation?: number;
  /** suppress events (optional) */
  suppressEvents?: boolean;
};

export default StackViewportProperties;
