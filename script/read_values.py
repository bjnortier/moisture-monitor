import json
import mcp3008
from time import sleep
import os
import sys

out = os.fdopen(sys.stdout.fileno(), 'w', 1)
while True:
    values = map(lambda x: mcp3008.readadc(x), range(8))
    out.write(json.dumps(values))
    out.write('\n')
    sleep(1)