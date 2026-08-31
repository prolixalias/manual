const trees = [
    { id: 'tree-01', left: 100, top: 160, type: 'cherry', sick: true,  name: 'Van Sweet Cherry D', desc: '10\' tall x 10\' wide<br>Japanese Beetles', emoji: '🍒', ariaLabel: 'A', width_ft: 10 },
    { id: 'tree-02', left: 100, top: 320, type: 'cherry', sick: false, name: 'North Star Sour Cherry D', desc: '10\' tall x 8\' wide<br>Healthy', emoji: '🍒', ariaLabel: 'B', width_ft: 8 },
    { id: 'tree-03', left: 100, top: 480, type: 'pear',   sick: false, name: 'Bartlett Pear D', desc: '10\' tall x 7\' wide<br>Healthy', emoji: '🍐', ariaLabel: 'C', width_ft: 7 },
    { id: 'tree-04', left: 100, top: 640, type: 'apple',  sick: false, name: 'Wolf River "1881" Apple SD', desc: '12\' tall x 14\' wide<br>Healthy', emoji: '🍎', ariaLabel: 'D', width_ft: 14 },
    { id: 'tree-05', left: 200, top: 160, type: 'pear',   sick: false, name: 'Chojuro Asian Pear SD', desc: '15\' tall x 11\' wide<br>Healthy', emoji: '🍐', ariaLabel: 'E', width_ft: 11 },
    { id: 'tree-06', left: 200, top: 320, type: 'cherry', sick: true,  name: 'Montmorency Cherry D', desc: '10\' tall x 10\' wide<br>Shot Hole fungus', emoji: '🍒', ariaLabel: 'F', width_ft: 10 },
    { id: 'tree-07', left: 200, top: 480, type: 'peach',  sick: false, name: 'Carolina Belle Peach D', desc: '10\' tall x 10\' wide<br>Healthy', emoji: '🍑', ariaLabel: 'G', width_ft: 10 },
    { id: 'tree-08', left: 200, top: 640, type: 'apple',  sick: false, name: 'Golden Delicious Apple D', desc: '15\' tall x 10\' wide<br>Healthy', emoji: '🍎', ariaLabel: 'H', width_ft: 10 },
    { id: 'tree-09', left: 300, top: 160, type: 'pear',   sick: false, name: 'Seckel Pear D', desc: '10\' tall x 7\' wide<br>Healthy', emoji: '🍐', ariaLabel: 'I', width_ft: 7 },
    { id: 'tree-10', left: 300, top: 320, type: 'plum',   sick: false, name: 'Pipestone Plum SD', desc: '15\' tall x 12\' wide<br>Healthy', emoji: '🫐', ariaLabel: 'J', width_ft: 12 },
    { id: 'tree-11', left: 300, top: 480, type: 'plum',   sick: false, name: 'Stanley Plum D', desc: '15\' tall x 12\' wide<br>Healthy', emoji: '🫐', ariaLabel: 'K', width_ft: 12 },
    { id: 'tree-12', left: 300, top: 640, type: 'apple',  sick: true,  name: 'Golden Delicious Apple SD', desc: '14\' tall x 14\' wide<br>Fire Ant infested', emoji: '🍎', ariaLabel: 'L', width_ft: 14 }
];

const container = document.getElementById('orchard-container');

trees.forEach(tree => {
    // Create canopy
    const canopy = document.createElement('div');
    canopy.className = 'canopy';
    canopy.style.left = `${tree.left}px`;
    canopy.style.top = `${tree.top}px`;
    canopy.style.width = `${tree.width_ft * 10}px`;
    canopy.style.height = `${tree.width_ft * 10}px`;
    container.appendChild(canopy);

    // Create tree
    const el = document.createElement('div');
    el.className = `tree ${tree.sick ? 'sick ' : ''}${tree.type} tooltip`;
    el.style.left = `${tree.left}px`;
    el.style.top = `${tree.top}px`;
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', tree.ariaLabel);
    el.setAttribute('aria-describedby', `${tree.id}-tooltip`);
    el.innerHTML = `
        ${tree.emoji}
        <span id="${tree.id}-tooltip" class="tooltiptext">
            ${tree.name}
            <span class="description">${tree.desc}</span>
        </span>
    `;
    container.appendChild(el);
});

// Add click support for tooltips
document.querySelectorAll('.tooltip').forEach(tooltip => {
    tooltip.addEventListener('click', (e) => {
        // Close other tooltips
        document.querySelectorAll('.tooltip.active').forEach(active => {
            if (active !== tooltip) active.classList.remove('active');
        });
        tooltip.classList.toggle('active');
        e.stopPropagation();
    });
});

// Close tooltips when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.tooltip.active').forEach(active => {
        active.classList.remove('active');
    });
});