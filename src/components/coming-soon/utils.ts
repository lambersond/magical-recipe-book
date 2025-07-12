export const getStatusText = (status: string) => {
  switch (status) {
    case 'completed': {
      return 'Completed'
    }
    case 'in-progress': {
      return 'In Progress'
    }
    default: {
      return 'Coming Soon'
    }
  }
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': {
      return 'border-green-500/30 bg-green-500/10'
    }
    case 'in-progress': {
      return 'border-yellow-500/30 bg-yellow-500/10'
    }
    default: {
      return 'border-gray-500/30 bg-gray-500/10'
    }
  }
}
