import { createSynchronizer } from '../../store/SynchronizerManager';
import { Enums } from '@cornerstonejs/core';
import cameraSyncCallback from '../callbacks/cameraSyncCallback';
import Synchronizer from '../../store/SynchronizerManager/Synchronizer';

const { CAMERA_MODIFIED } = Enums.Events;

/**
 * A helper that creates a new `Synchronizer` which listens to the `CAMERA_MODIFIED`
 * rendering event and calls the `cameraSyncCallback`.
 *
 * @param synchronizerName - The name of the synchronizer.
 * @param options - allows passing option values to the synchronizer on "this"
 * @returns A new `Synchronizer` instance.
 */
export default function createCameraPositionSynchronizer(
  synchronizerName: string
): Synchronizer {
  const cameraPositionSynchronizer = createSynchronizer(
    synchronizerName,
    CAMERA_MODIFIED,
    cameraSyncCallback
  );

  return cameraPositionSynchronizer;
}
