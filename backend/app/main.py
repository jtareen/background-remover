from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PIL import Image, ImageColor
from io import BytesIO
from rembg import remove

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

@app.route('/remove-bg', methods=['POST'])
def remove_bg():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image_file = request.files['image']
    image = Image.open(image_file)

    # Remove background using U²-Net (Rembg)
    output = remove(image)

    # Convert image to bytes
    img_io = BytesIO()
    output.save(img_io, format='PNG')
    img_io.seek(0)

    # Return the image file in response
    return send_file(img_io, mimetype='image/png')

@app.route('/add-bg-color', methods=['POST'])
def add_bg_color():
    if 'image' not in request.files or 'color' not in request.form:
        return jsonify({"error": "Missing image or color"}), 400

    try:
        image_file = request.files['image']
        hex_color = request.form['color']
        rgb_color = ImageColor.getrgb(hex_color)

        image = Image.open(image_file).convert("RGBA")

        # Create background layer with the given color
        background = Image.new("RGBA", image.size, rgb_color + (255,))
        combined = Image.alpha_composite(background, image)

        # Convert image to bytes
        img_io = BytesIO()
        combined.save(img_io, format='PNG')
        img_io.seek(0)

        return send_file(img_io, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
