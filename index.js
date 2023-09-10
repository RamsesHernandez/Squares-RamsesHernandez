const drawContainer = (containerSize, childSize, numberOfChildren) => {
  const container = document.querySelector('.mainSquare');
  container.style.width = `${containerSize}px`;
  container.style.height = `${containerSize}px`;

  const maxChildrenInRow = Math.floor(containerSize / childSize);
  const maxChildrenInCol = Math.floor(containerSize / childSize);

  const maxChildren = maxChildrenInRow * maxChildrenInCol;

  if (numberOfChildren > maxChildren) {
    alert(`The container can only fit ${maxChildren} children. Adjusting values...`);
    containerSize = maxChildrenInRow * childSize;
    childSize = containerSize / maxChildrenInRow;
  }

  const renderedChildren = Math.min(numberOfChildren, maxChildren);

  const calculatedChildSize = Math.min(childSize, containerSize / maxChildrenInRow, containerSize / maxChildrenInCol);

  for (let i = 0; i < renderedChildren; i++) {
    const child = document.createElement('div');
    child.classList.add('child');
    child.style.backgroundColor = getRandomColor();
    const row = Math.floor(i / maxChildrenInRow);
    const col = i % maxChildrenInRow;

    child.style.width = `${calculatedChildSize}px`;
    child.style.height = `${calculatedChildSize}px`;
    child.style.top = `${row * calculatedChildSize}px`;
    child.style.left = `${col * calculatedChildSize}px`;

    container.appendChild(child);

    child.addEventListener('mouseenter', function() {
      this.style.backgroundColor = getRandomColor();
      let hoverTimeout = setTimeout(() => {
        this.style.display = 'none';
      }, 2000);
      this.addEventListener('mouseleave', function() {
        clearTimeout(hoverTimeout);
      });
    });
  }

  document.documentElement.style.setProperty('--child-size', `${calculatedChildSize}px`);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
};

