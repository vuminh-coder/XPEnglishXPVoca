import sys
print(sys.executable)
for mod in ['whisper', 'faster_whisper', 'speech_recognition', 'vosk', 'torch', 'torchaudio', 'transformers']:
    try:
        __import__(mod)
        print(f'{mod}: available')
    except ImportError:
        print(f'{mod}: NOT')
