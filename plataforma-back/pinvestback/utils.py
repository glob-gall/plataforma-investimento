import uuid
import os.path

def generate_uuid4_filename(filename):
    discard, ext = os.path.splitext(filename)
    basename = uuid.uuid4().urn
    return ''.join(basename, ext)
