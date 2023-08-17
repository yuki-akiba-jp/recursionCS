import sys

if sys.argv[1] == "markdown":
    infilename = sys.argv[2]
    outfilename = sys.argv[3]

    import markdown
    html = ''
    with open(infilename, 'r') as f:
        your_text_string = f.read()
        html = markdown.markdown(your_text_string)

    with open(outfilename, 'w') as f:
        f.write(html)
