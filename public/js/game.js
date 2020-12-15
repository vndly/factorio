class Game
{
    static instance = null

    map = null
    grid = null
    lastTimestamp = 0

    constructor()
    {
        this.map = new MapLoader().load()
        this.map.connect()

        const canvas = document.getElementById('canvas')
        canvas.width = document.body.clientWidth
        canvas.height = document.body.clientHeight
        this.grid = new Grid(canvas, this.map)
    }

    loop(timestamp)
    {
        if (this.lastTimestamp > 0)
        {
            const start1 = performance.now()
            const delta = parseFloat((timestamp - this.lastTimestamp).toFixed(2))
            this.map.update(delta)
            const end1 = performance.now()
            console.log('update: ' + (end1 - start1).toFixed(2))

            const start2 = performance.now()
            this.grid.render()
            const end2 = performance.now()
            console.log('render: ' + (end2 - start2).toFixed(2))
        }

        this.lastTimestamp = timestamp

        window.requestAnimationFrame(Game.step)
    }

    static init()
    {
        Game.instance = new Game()
        window.requestAnimationFrame(Game.step)
    }

    static step(timestamp)
    {
        Game.instance.loop(timestamp)
    }

    static onStructureClick(structure)
    {
        console.log('Structure clicked: ' + structure.x + ',' + structure.y)
    }
}