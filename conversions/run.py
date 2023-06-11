import convert
import time

def __main__():
    print("HI");
    start_time = time.time()
    result=convert.convert("I understand you need to think about this before you’re ready to commit. I’ll email you everything we just talked about, shortly after the call, so you can see the numbers for yourself and discuss them with the other decision-makers in your company.")
    print("--- %s seconds ---" % (time.time() - start_time))
    with open("output.wav", "wb") as out:
        # Write the response to the output file.
        out.write(result)
        print('Audio content written to file "output.mp3"')

__main__()