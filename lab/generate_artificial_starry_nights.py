import random

from PIL import Image


def gen_base_img(width: int, height: int):
    return Image.new("RGB", (width, height), color="black")


"""Distribución del brillo

[60-80]      5%
[80-100]    10%
[100-150]   30%
[150-200]   40%
[200-240]   10%
[240-255]    5%

"""

def get_bright() -> int:
    bucket = random.randint(a=0, b=100)

    if bucket <= 5:
        return random.randint(a=60, b=80)

    if bucket <= 15:
        return random.randint(a=80, b=100)

    if bucket <= 45:
        return random.randint(a=100, b=150)

    if bucket <= 85:
        return random.randint(a=150, b=200)

    if bucket <= 95:
        return random.randint(a=200, b=240)

    # if bucket <= 100:
    return random.randint(a=240, b=255)


def get_type_star() -> int:
    types = {
        1: "square",
        2: "star",
        3: "ele",
    }

    return types[random.randint(a=1, b=3)]


# black_image.save('black_image.png')


def gen_starry_night(saving_path: str):
    width = 400
    height = 400

    base_img = gen_base_img(width, height)

    num_stars = random.randint(a=3, b=200)
    print(f"trying to put {num_stars} stars")
    total_stars = 0

    for i in range(num_stars):
        x = random.randint(a=2, b=width-2)
        y = random.randint(a=2, b=height-2)
        bright = get_bright()

        bright_pix = (bright, bright, bright)

        # center
        if base_img.getpixel(xy=(x, y)) == 255:
            continue

        # right
        if base_img.getpixel(xy=(x-1, y)) == 255:
            continue

        # left
        if base_img.getpixel(xy=(x+1, y)) == 255:
            continue

        # up
        if base_img.getpixel(xy=(x, y-1)) == 255:
            continue

        # down
        if base_img.getpixel(xy=(x, y+1)) == 255:
            continue

        # up-right
        if base_img.getpixel(xy=(x+1, y-1)) == 255:
            continue

        # up-left
        if base_img.getpixel(xy=(x-1, y-1)) == 255:
            continue

        # down-right
        if base_img.getpixel(xy=(x+1, y+1)) == 255:
            continue

        # down-left
        if base_img.getpixel(xy=(x-1, y+1)) == 255:
            continue

        type_star = get_type_star()

        if type_star == "square":
            base_img.putpixel(xy=(x, y), value=bright_pix)
            base_img.putpixel(xy=(x+1, y), value=bright_pix)
            base_img.putpixel(xy=(x, y+1), value=bright_pix)
            base_img.putpixel(xy=(x+1, y+1), value=bright_pix)
        elif type_star == "ele":
            base_img.putpixel(xy=(x, y), value=bright_pix)
            base_img.putpixel(xy=(x-1, y), value=bright_pix)
            base_img.putpixel(xy=(x, y+1), value=bright_pix)
        else:
            base_img.putpixel(xy=(x, y), value=bright_pix)
            base_img.putpixel(xy=(x, y-1), value=bright_pix)
            base_img.putpixel(xy=(x+1, y), value=bright_pix)
            base_img.putpixel(xy=(x, y+1), value=bright_pix)
            base_img.putpixel(xy=(x-1, y), value=bright_pix)

        total_stars += 1


    print("total_stars", total_stars)
    # base_img.show()

    base_img.save(saving_path.format(num_stars=total_stars))


if __name__ == '__main__':
    BASE_DEST_PATH = "../assets/testing/a_{num_stars}.png"

    num_images = int(input("Type the number of images to generate: "))

    for _ in range(num_images):
        gen_starry_night(BASE_DEST_PATH)