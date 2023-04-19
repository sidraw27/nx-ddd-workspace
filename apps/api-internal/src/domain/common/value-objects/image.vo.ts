import { ValueObject } from '@domain/common/value-objects/base.vo';
import * as crypto from 'crypto';

export enum IMAGE_RESIZE_TYPE {

}

interface ImageProps {
  id: string
  filePath: string
  fileName: string
  extension: string
  resizeType?: IMAGE_RESIZE_TYPE
  versionSeed?: string
}

export class ImageVo extends ValueObject<ImageProps> {
  get link(): string {
    const {
      filePath, fileName, extension, versionSeed, resizeType,
    } = this.props;
    const md5 = crypto.createHash('md5');
    const version = md5.update(versionSeed ?? '1').digest('hex');

    return `${filePath}${fileName}.${extension}?v=${version}&img_resize_type=${resizeType}`;
  }

  private constructor(props: ImageProps) {
    super(props);
  }

  public static create(props: ImageProps): ImageVo {
    return new ImageVo(props);
  }

  public setResizeType(resizeType: IMAGE_RESIZE_TYPE): ImageVo {
    const {
      id, filePath, fileName, extension, versionSeed,
    } = this.props;

    return ImageVo.create({
      id, filePath, fileName, extension, resizeType, versionSeed,
    });
  }
}
