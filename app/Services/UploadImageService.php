<?php

namespace App\Services;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\UploadedFile;

class UploadImageService
{
    public function saveImage($file, $id = null): object
    {
        try {
            if ($id !== null) {
                Cloudinary::destroy($id);
            }
            $uploadedFile = Cloudinary::upload($file, ['folder' => env('CLOUDINARY_FILE_NAME')]);
            return (object) [
                'image_url' => $uploadedFile->getSecurePath(),
                'public_id' => $uploadedFile->getPublicId(),
            ];
        } catch (\Throwable $th) {
            throw new \BadMethodCallException($th->getMessage());
        }
    }

    public function destroyImage($id)
    {
        try {
            Cloudinary::destroy($id);
        } catch (\Throwable $th) {
            throw new \BadMethodCallException($th->getMessage());
        }
    }
}
